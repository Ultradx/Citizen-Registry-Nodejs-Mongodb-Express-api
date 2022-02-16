# Citizen-Registry-Nodejs-Mongodb-Express-api
Υπάρχουν 2 τρόποι να τρέξετε το project.
# 1ο Τρόπος
Για να εκτελεστή το πρόγραμμα πρέπει αρχικά να κατεβάσουμε την πλατφόρμα Node js (17.5.0 Current) και την βάση δεδομένων MongoDB Community από τον επίσημο ισότοπο.
Στην συνέχεια πρέπει να συνδέσετε το MongoDB στο lacalhost και στην πορτα 27017.
Αφού κάνουμε τα παραπάνω πρέπει να τρέξουμε μια προς μια τις εξής εντολές.
1) npm install
2) npm install express --save
3) npm i body-parser method-override view engine mongoose ejs
4) node server.js
Και πηγαίνουμε στο http://localhost:3000/ για να δούμε τα αποτελέσματα. Λόγο ότι δεν θα έχετε κάποιον πολίτη στην βάση και για την δημιουργία υπάρχουν μερική κανόνες για να εισαχθεί ο πολίτης επιτυχώς δείτε τα μηνύματα λάθους που θα σας πετάει στο Terminal για γνωρίζεται που είναι το λάθος.
# 2ο Τρόπος
Λόγο του ότι τα πακέτα συνέχεια αλλάζουν και υπάρχει περίπτωση όταν το κατεβάσετε να έχετε νεότερη έκδοση και να έχετε θέμα να τρέξετε τις παραπάνω εντολές(Εκτός αν ξέρετε πως να το διορθώσετε). Κατεβαστέ την εφαρμογή Docker(Αν έχετε Windows μπορεί να σας βγει η πιστή για ένα σφάλμα με τον Kernel) άνοιξέ την και τρέξτε στο Terminal την εντολή "docker-compose up" Αυτή η εντολή θα κατεβάσει δυο εικόνες από το Docker Hub που τα έχω ανεβάσει και θα δημιουργήσει αυτόματα το περιβάλλον. Μετα απλά πηγαίνετε στο http://localhost:3000/
# Screenshots
![image](https://user-images.githubusercontent.com/37597102/154357254-4ca2ef8a-225b-4faf-acae-c92a2facb9f0.png)
![image](https://user-images.githubusercontent.com/37597102/154357290-9ffe0849-17ab-4ebb-a79a-2fcefa200d2b.png)
![image](https://user-images.githubusercontent.com/37597102/154357309-7c75a685-ece6-4a16-bb84-3395efb6c972.png)
![image](https://user-images.githubusercontent.com/37597102/154357321-90709b03-55d4-4d62-96d9-ac15c0a35626.png)
