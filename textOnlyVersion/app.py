from flask import Flask, request, redirect
import twilio.twiml

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def response():
    body = request.values.get('Body', None)
    print body
    resp = twilio.twiml.Response()
    resp.sms(str(body))
    return str(resp)
if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = 8080, debug=True)
