# Tip Calculator
Simple JavaScript program to calculate tip and split bill (up to 8 ways).

### Before Input
Below is a screenshot of what the app looks in its original state.  Note that nothing will happen unless a valid bill amount is enetered (a number above zero) - validation and focus on the input will occur is bill is invalid.
<img width="704" alt="screenshor-original-state" src="https://user-images.githubusercontent.com/58275084/140566171-161e4528-1676-4f6d-91a7-9ee6a4eaed13.png">
<img width="698" alt="screenshot-input-validation" src="https://user-images.githubusercontent.com/58275084/140567790-117a6012-4cb5-4766-9883-0eb8785d246a.png">

### Simple Input
If the user selects 'basic' input values, the returned 'receipt' will look pretty straightforward.
<img width="699" alt="screenshot-simple" src="https://user-images.githubusercontent.com/58275084/140566200-1544e594-8ee6-4ef8-9d07-ae22d21b55b5.png">

### Complex Input
In this case, the user chose to both split the bill AND round up individual contributions.  If the user select 'round up' but the total bill can already be split 'perfectly' (whole dollars, with no remainder), the user is notified, and no adjustments are made.
<img width="697" alt="screenshot-adjustments" src="https://user-images.githubusercontent.com/58275084/140566219-9eb1c1d0-f45e-42e1-b1e0-4ae37418f0e7.png">
<img width="696" alt="screenshot-no-adjustment" src="https://user-images.githubusercontent.com/58275084/140567800-38e5a7c9-4fef-4aea-98d2-5c2d9e3a819c.png">
