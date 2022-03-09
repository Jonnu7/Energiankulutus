import json, csv
from datetime import datetime
from urllib.request import urlopen
from pathlib import Path

def api_call():
    with urlopen("https://helsinki-openapi.nuuka.cloud/api/v1.0/EnergyData/Daily/ListByProperty?Record=LocationName&SearchString=1000%20Hakaniemen%20kauppahalli&ReportingGroup=Electricity&StartTime=2019-01-01&EndTime=2019-12-31") as file:
        call = json.loads(file.read())
        date_now = datetime.now()
        today = date_now.strftime("%d%m%Y_%H%M%S")
        file_name = Path(__file__).with_name(f"data_{today}.csv")
        file_name.touch(exist_ok=True)
        with open(file_name, "w+", newline="") as csv_file:
            fieldnames = ["timestamp", "reportingGroup", "locationName", "value", "unit"]
            
            csv_data = csv.DictWriter(csv_file, fieldnames=fieldnames)            
            csv_file.write("timestamp,reportingGroup,locationName,value,unit")
            csv_file.write("\n")
            for data in call:                              
                csv_data.writerow(data)
            
            
        return file_name

def parse_monthly_data(filename: str):
    with open(filename, "r") as csv_file:
        datareader = csv.reader(csv_file)
        next(datareader)        
        monthly = {k:0 for k in ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"]}
        for list in datareader:
            if list[0][5:7] == "01":
                monthly["tammikuu"] += float(list[3])
            elif list[0][5:7] == "02":
                monthly["helmikuu"] += float(list[3])
            elif list[0][5:7] == "03":
                monthly["maaliskuu"] += float(list[3])
            elif list[0][5:7] == "04":
                monthly["huhtikuu"] += float(list[3])
            elif list[0][5:7] == "05":
                monthly["toukokuu"] += float(list[3])
            elif list[0][5:7] == "06":
                monthly["kesäkuu"] += float(list[3])
            elif list[0][5:7] == "07":
                monthly["heinäkuu"] += float(list[3])
            elif list[0][5:7] == "08":
                monthly["elokuu"] += float(list[3])
            elif list[0][5:7] == "09":
                monthly["syyskuu"] += float(list[3])
            elif list[0][5:7] == "10":
                monthly["lokakuu"] += float(list[3])
            elif list[0][5:7] == "11":
                monthly["marraskuu"] += float(list[3])
            elif list[0][5:7] == "12":
                monthly["joulukuu"] += float(list[3])
        #monthly_nondict = [(k, v) for k, v in monthly.items()]     #yritys saada dataa näkyviin siltä varalta, että ongelma olisi sanakirjassa.
        return monthly # monthly_nondict

def main():
    info = api_call()
    kk = parse_monthly_data(info)
    print(kk)    
    return kk

if __name__ == "__main__":
    main()