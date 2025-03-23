"""Redirect HTTP requests to another server."""

from mitmproxy import http
import json
import sqlite3
import uuid
from pyxdameraulevenshtein import damerau_levenshtein_distance_seqs, normalized_damerau_levenshtein_distance_seqs
import csv

phishing = json.load(open("online-valid.json"))
urls = {i['url']: i['target'] for i in phishing}
popular_sites = []
#with open("top-1m.csv") as f:
#    reader = csv.reader(f)
#    array = list(reader)
#for i in array[:1000]:
#    popular_sites.append(i[1])
conn = sqlite3.connect("hengel.db")
def request(flow: http.HTTPFlow) -> None:
    # pretty_host takes the "Host" header of the request into account,
    # which is useful in transparent mode where we usually only have the IP
    # otherwise.
    a = flow.request.url
#    b = flow.request.pretty_host
#    scoring = normalized_damerau_levenshtein_distance_seqs(b, popular_sites)
#    indexes = [i for i,v in enumerate(scoring) if v < 0.35]
    if (a) in urls.keys():
        print("TRUE, FOUND A VALID URL")
        flow.request.host = "mitmproxy.org"
        query = "INSERT INTO vulns('ID', 'Type', 'Target', 'URL') VALUES (?, ?, ?, ?)"
        id = uuid.uuid4().__str__()
        data_tuple = (id, "Phishing", urls[a], a)
        conn.execute(query, data_tuple)
        conn.commit()
#    if 0 not in scoring and len(indexes) > 0:
#        html =
#        flow.request.url = "http://localhost:8000/a.html"
#        suggestions = [popular_sites[i] for i in indexes]
#        print("\n".join(suggestions))
#        print("------------")
    


