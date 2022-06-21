from tokenize import String
from flask import Flask, render_template, request, redirect
import json
from utils import killjoy

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form.get("search")
        return redirect(f"http://127.0.0.1:5000/info/{name.upper()}")
    return render_template("home.html")

@app.route("/info/<name>")
def info(name):
    eps, net_profits, div_payouts, p2e, roe, roce, months = killjoy.formatter(f"{name.upper()}.csv")
    final_verdict = killjoy.estimate(eps, div_payouts, p2e, roe, roce)
    final_verdict["net_profits"] = net_profits
    final_verdict["months"] = months
    return render_template("info.html", company_name=name, final_verdict=json.dumps(final_verdict))

@app.route("/faq")
def faq():
    return render_template("faq.html")