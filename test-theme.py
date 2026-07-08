import urllib.request
with urllib.request.urlopen('file:///Users/guest2/Desktop/repos/catalyst/index.html') as response:
    html = response.read()
    print("Length of HTML:", len(html))
