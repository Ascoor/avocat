import requests
from bs4 import BeautifulSoup

# Disable warnings from unverified HTTPS requests
requests.packages.urllib3.disable_warnings()

# URL of the page to scrape
url = 'https://moj.gov.eg/ar/Pages/Services/CaseCurrentStatus.aspx'

def fetch_initial_state():
    response = requests.get(url, verify=False)
    soup = BeautifulSoup(response.content, 'html.parser')
    viewstate = soup.find("input", {"id": "__VIEWSTATE"})["value"]
    eventvalidation = soup.find("input", {"id": "__EVENTVALIDATION"})["value"]
    return viewstate, eventvalidation

def simulate_selection_and_submit(viewstate, eventvalidation, selection_data):
    response = requests.post(url, data=selection_data, verify=False)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        updated_viewstate = soup.find("input", {"id": "__VIEWSTATE"})["value"]
        updated_eventvalidation = soup.find("input", {"id": "__EVENTVALIDATION"})["value"]
        return updated_viewstate, updated_eventvalidation, soup
    else:
        print("Request failed during selection.")
        return None, None, None

# Step 1: Fetch the initial state
viewstate, eventvalidation = fetch_initial_state()

# Step 2: Select the degree "ابتدائى"
degree_selection_data = {
    "__VIEWSTATE": viewstate,
    "__EVENTVALIDATION": eventvalidation,
    "ctl00$ctl58$g_7dd5062a_d3d6_4e62_aca8_27975ce28424$ddlDegree": "3",
}
viewstate, eventvalidation, soup = simulate_selection_and_submit(viewstate, eventvalidation, degree_selection_data)
print("Degree 'ابتدائى' selected.")

# Steps 3-5: Select the court "9", display case type options, verify fields, and perform search
court_selection_data = {
    "__VIEWSTATE": viewstate,
    "__EVENTVALIDATION": eventvalidation,
    "ctl00$ctl58$g_7dd5062a_d3d6_4e62_aca8_27975ce28424$ddlCourt": "9",
}
viewstate, eventvalidation, soup = simulate_selection_and_submit(viewstate, eventvalidation, court_selection_data)

final_post_data = {
    "__VIEWSTATE": viewstate,
    "__EVENTVALIDATION": eventvalidation,
    "ctl00$ctl58$g_7dd5062a_d3d6_4e62_aca8_27975ce28424$ddlDegree": "3",
    "ctl00$ctl58$g_7dd5062a_d3d6_4e62_aca8_27975ce28424$ddlCourt": "9",
    "ctl00$ctl58$g_7dd5062a_d3d6_4e62_aca8_27975ce28424$ddlCaseType": "27",
    "ctl00$ctl58$g_7dd5062a_d3d6_4e62_aca8_27975ce28424$txtCaseYear": "2023",
    "ctl00$ctl58$g_7dd5062a_d3d6_4e62_aca8_27975ce28424$txtCaseNumber": "279",
    "ctl00$ctl58$g_7dd5062a_d3d6_4e62_aca8_27975ce28424$btnSearch": "بحث"
}
response = requests.post(url, data=final_post_data, verify=False)
if response.status_code == 200:
    search_soup = BeautifulSoup(response.content, 'html.parser')
    print("Search performed, displaying HTML content:")
    # Print the entire HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extracting information
    case_number = soup.find("input", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultCaseNumber"}).get("value")
    case_year = soup.find("input", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultCaseYear"}).get("value")
    case_type = soup.find("input", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultCaseType"}).get("value")
    registration_date = soup.find("input", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultCaseDate"}).get("value")
    plaintiff_name = soup.find("input", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultPerson1"}).get("value")
    defendant_name = soup.find("input", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultPerson2"}).get("value")
    case_subject = soup.find("textarea", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultSubject"}).text.strip()
    last_session_date = soup.find("input", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultLastSessionDate"}).get("value")
    last_session_decision = soup.find("textarea", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_txtResultLastSessionDecision"}).text.strip()

    # Printing extracted information
    print(f"Case Number: {case_number}")
    print(f"Case Year: {case_year}")
    print(f"Case Type: {case_type}")
    print(f"Registration Date: {registration_date}")
    print(f"Plaintiff Name: {plaintiff_name}")
    print(f"Defendant Name: {defendant_name}")
    print(f"Case Subject: {case_subject}")
    print(f"Last Session Date: {last_session_date}")
    print(f"Last Session Decision: {last_session_decision}")

    # Extract and print session details if needed
    sessions = soup.find("table", {"id": "ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_grdRolls"})
    for row in sessions.find_all("tr")[1:]:  # Skipping header row
        columns = row.find_all("td")
        session_date = columns[0].text.strip()
        session_decision = columns[1].text.strip()
        next_session_date = columns[2].text.strip() if len(columns) > 2 else "N/A"
        print(f"Session Date: {session_date}, Decision: {session_decision}, Next Session Date: {next_session_date}")
else:
    print("Failed to perform search.")
    # Warning: The output can be very large; consider printing specific parts or elements
    print(search_soup.prettify())
