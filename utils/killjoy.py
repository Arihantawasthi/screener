import csv
import os

def formatter(name):
    path = os.getcwd() + f"/utils/company_data/{name}"
    print(path)
    file = open(path)
    reader = csv.reader(file)
    header = next(reader)
    #print(header[4])

    eps = []
    net_profits = []
    div_payouts = []
    p2e = []
    roe = []
    roce = []
    years = []

    for row in reader:
        #Retrieving Net Profit
        net_profits.append(float(row[2].replace(",", "")))
        years.append(row[0])

        #Retrieving Dividend Payout
        if float(row[5]) != 0:
            div_payouts.append(float(row[5].replace(",", "")))

        #Retrieving Price to Earnings
        if float(row[3]) != 0:
            p2e.append(float(row[3].replace(",", "")))

        #Retrieving Return on Equity
        if float(row[6]) != 0:
            roe.append(float(row[6].replace(",", "")))
        
        #Retrieving Return on Capital Emp
        if float(row[7]) != 0:
            roce.append(float(row[7].replace(",", "")))

        #Retrieving EPS (Earnings Per Share)
        if float(row[4]) != 0:
            eps.append(float(row[4].replace(",", "")))
    
    return eps, net_profits, div_payouts, p2e, roe, roce, years


""" print(eps)
print(net_profits)
print(div_payouts)
print(p2e)
print(roe)
print(roce) """

def estimate(eps, div_payouts, p2e, roe, roce): 
    verdict = {
        "eps": "",
        "div_payouts": "",
        "p2e": "",
        "roe": "",
        "roce": "",
        "star": 0
    }

    #Earnings Per Share
    if eps[0] < eps[2]:
        verdict["eps"] = "HEALTHY!"  
        verdict["star"] += 1

    #Divident Payouts
    if len(div_payouts) == 0:
        verdict["div_payouts"] = "RISKY!"
    elif div_payouts[0] >= 30 and div_payouts[0] <= 50 and div_payouts[1] >= 30 and div_payouts <= 50:
        verdict["div_payouts"] = "HEALTHY!"
        verdict["star"] += 1
    else:
        verdict["div_payouts"] = "RISKY!"
    
    #Price to Earning
    if len(p2e) == 0:
        verdict["p2e"] = "CHEAP!"
    elif p2e[0] < 20:
        verdict["p2e"] = "CHEAP!"
        verdict["star"] += 1
    else:
        verdict["p2e"] = "Might Be Overvalued!"

    #Return on Equity    
    if roe[0] >= 15 and roe[0] <= 20:
        verdict["roe"] = "GOOD!"
        verdict["star"] += 1
    elif roe[0] > 20 and roe[0] <= 25:
        verdict["roe"] = "GREAT!"
        verdict["star"] += 1
    elif roe[0] > 25:
        verdict["roe"] = "EXTREMELY GOOD!"
        verdict["star"] += 1
    elif roe[0] < 15 and roe[0] >= 10:
        verdict["roe"] = "ACCEPTABLE!"
    elif roe[0] < 10:
        verdict["roe"] = "BAD!"
    
    #Return on Capital Emp
    if roce[0] >= 20:
        verdict["roce"] = "GOOD!"
        verdict["star"] += 1
    if roce[0] < 20:
        verdict["roce"] = "BAD!"
    
    return verdict

#final_verdict = estimate(eps, div_payouts, p2e, roe, roce)

#print(final_verdict)
    
