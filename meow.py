"""Redirect HTTP requests to another server."""

from mitmproxy import http
import json
import sqlite3
import uuid

a = json.load(open("online-valid.json"))
urls = {i['url']: i['target'] for i in a}
print(urls)
conn = sqlite3.connect("hengel.db")
def request(flow: http.HTTPFlow) -> None:
    # pretty_host takes the "Host" header of the request into account,
    # which is useful in transparent mode where we usually only have the IP
    # otherwise.
    a = flow.request.url
    print(a)
    if (a) in urls.keys():
        print("TRUE, FOUND A VALID URL")
        flow.request.host = "mitmproxy.org"
        query = "INSERT INTO vulns('ID', 'Type', 'Target', 'URL') VALUES (?, ?, ?, ?)"
        id = uuid.uuid4().__str__()
        data_tuple = (id, "Phishing", urls[a], a)
        conn.execute(query, data_tuple)
        conn.commit()


