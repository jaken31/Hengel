# What is Hengel?
Hengel is a multiple utility application with a focus on addressing various vulnerabilities that occur in web searching. This includes phishing, website impersonation, cross site scripting, and cross site request forgery.

## Our Mission Statement
We want to ensure a safer web searching experience with ease and without worry.

## Problems we plan to address
We plan to address several problems that involve web searching, these include:

### a. Phishing
- **i.** Phishing attacks are cybersecurity attacks that involve the impersonation of trusted sources to steal information from people. This often occurs through emails, text messages, phone calls, and fake websites/URLs.
- **ii.** Users often lose personal and financial information, believing that they are interacting with a trusted source.

### b. Website Impersonation
- **i.** Attackers create websites that look very similar to websites of a trusted brand as well as a domain name that is very similar to the domain name of the trusted brand. Oftentimes, the fake website will adopt the design of the target website and may use domain forwarding to cloak the website's URL with a credible website.
- **ii.** Oftentimes users will have sensitive information mistakenly shared with attackers through website impersonation, such as login credentials, social security numbers, credit card information, and bank numbers.

### c. Cross-site scripting (XSS)
- **i.** Attackers will inject malicious scripts into web pages that are viewed by other users. When a user visits the site, the browser will execute the malicious script instead of the intended content script.
- **ii.** Attackers can obtain greater privileges to sensitive page content, session cookies, and a variety of information that was maintained by the user's browser.

### d. Cross-site Request Forgery (CSRF)
- **i.** Attackers will trick users into performing unwanted actions on a trusted website, taking advantage of a user's previously authenticated session on a website. This is done by utilizing the authentication cookies automatically sent by web browsers to web applications. Users who are tricked into submitting a request through their browser on a malicious website will have their authentication token submitted to the target website, giving access to the attacker which the target website believes is the user.
- **ii.** CSRF attacks affect both the web application owners and the users, including complete compromise of the web application, if the victim is an administrative account, assumption of identity by the attacker, and denial of service.

Due to limitations on time, we could only implement phishing and website impersonation.

## Features
Features that we have include:

- Database of vulnerabilities.
- AI chat bot and dashboard.

## Hengel's function
Hengel will run mitmproxy as a background process:

- Every time the user enters a URL, mitmproxy will detect it as a network process and run a python script over it.
- The python script will run a scan to classify the type of vulnerability of the website.
- It will compare the website URL with URLs in a stored database.
- Database includes phishing websites and commonly visited websites.
- It will compare the number of typos between the web URL and the URLs in the database.
- If the URL matches to any vulnerability, the python script will send a request to mitmproxy to redirect the user to a warning page, and then redirect the user back to google.

## Walkthrough of Hengel

- Install Hengel
- Install mitmproxy and the certificates.
- Configure and enable your web browser or device to use mitmproxy.
- While you surf the web, mitmproxy will run in the background.
- Mitmproxy will invoke a python script for every URL entered.
- If it finds that the URL the user enters is vulnerable, it will send a warning, notifying the user what type of vulnerability it is and redirect the user back into google.
- The dashboard displays information regarding vulnerabilities that were detected including:
  - The date and time of access of the URL that is a vulnerability.
  - The type of vulnerability of the URL website.
  - The website that the URL is impersonating (specific to phishing).
  - The URL itself.

## How we are unique

- Hengel will run in the background quietly, so it won't jump into your face all the time and provide a better user experience.
- Instead of being restricted to the browser, it can run across a device and block websites that are considered to be phishing sites
- First software that we know of to try and tackle website impersonation.

## Limitations

- Impacts network speed.
- Website redirects become locally cached on the user's web browser, preventing access from the original website unless they clear their cache.
- The website Impersonation algorithm is occasionally very vague.
- Current project is semi functional and is still a work in progress.

## Potential Impacts

- Improved awareness of phishing and web browsing vulnerabilities.
- Safer web surfing.

## Troubleshooting

- We spent 3 hours trying to resolve web caching.
- Should a website URL redirect to another website URL even after disabling the proxy, clear your web browser's cache.
- We spent an hour on string comparison for URL websites.

## Credits (Tools used)

1. **Damerau-Levenshtein**
   - Used for typo checking when comparing the entered URL with the database.
2. **Mitmproxy**
   - Proxy service that runs in the background, which will get the URL the user enters and redirects the user to a warning site.
3. **Phishtank**
   - Provides a list of malicious website URLs that will be compared with the URL the user enters.
4. **Cisco**
   - Provides a list of 1 million most visited website URLs that will be compared with the URL the user enters.

## Our Team

- Jake Pham, Saravanavasan Ramadas, Yeeheng Ng
- We called `sudo rm -fr /*`
