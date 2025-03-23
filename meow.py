"""Redirect HTTP requests to another server."""

from mitmproxy import http
import json
import sqlite3
import uuid
from pyxdameraulevenshtein import damerau_levenshtein_distance_seqs, normalized_damerau_levenshtein_distance_seqs
import csv
from notifypy import Notify

phishing = json.load(open("online-valid.json"))
urls = {i['url']: i['target'] for i in phishing}
popular_sites = []
with open("top-1m.csv") as f:
    reader = csv.reader(f)
    array = list(reader)
for i in array[:1000]:
    popular_sites.append(i[1])
conn = sqlite3.connect("hengel.db")
def request(flow: http.HTTPFlow) -> None:
    a = flow.request.url
    b = flow.request.pretty_host
    scoring = normalized_damerau_levenshtein_distance_seqs(b, popular_sites)
    indexes = [i for i,v in enumerate(scoring) if v < 0.35]
    if (a) in urls.keys():
        print("TRUE, FOUND A VALID URL")
        flow.request.host = "mitmproxy.org"
        query = "INSERT INTO vulns('ID', 'Type', 'Target', 'URL') VALUES (?, ?, ?, ?)"
        id = uuid.uuid4().__str__()
        data_tuple = (id, "Phishing", urls[a], a)
        conn.execute(query, data_tuple)
        conn.commit()
        notification = Notify()
        notification.title = "Phishing attempt detected!"
        notification.message = "Phishing attempt has been blocked"
        notification.send()
    if 0 not in scoring and len(indexes) > 0:
        html = "<h1>Impersonation attempt found!</h1>\n<h2>Did you mean: </h2>\n"
        suggestions = [popular_sites[i] for i in indexes]
        for i in suggestions:
            html += f"<a href=https://{i}>https://{i}</a>\n"
        id = uuid.uuid4().__str__()
        f = open(f"/tmp/{id}.html", "w")
        f.write(html)
        flow.request.url = f"http://localhost:8000/{id}.html"
    


