# Ntua-Appathon-2020

## Project CTGOV-02: Συχνά Φάρμακα για την αντιμετώπιση μιας συγκεκριμένης Ασθένειας

Υλοποίηση μίας εφαρμογής, η οποία βρίσκει τα 10 πιο συχνά φάρμακα που έχουν χορηγηθεί για την αντιμετώπιση μιας συγκεκριμένης ασθένειας. 
Ο χρήστης θα εισάγει το όνομα της ασθένειας μέσω της web σελίδας και ως αποτέλεσμα θα είναι τα 10 πιο συχνά φάρμακα (φαρμακευτικές ουσίες) καθώς και η συχνότητα χρήσης τους. 

## Τεχνολογίες που θα χρησιμοποιηθούν

To frontend της εφαρμογής θα υλοποιηθεί εξ'ολοκλήρου με το framework <strong>Angular 10</strong>.
Πρόκειται για framework βασιζόμενο σε Typescript (υπερσύνολο της Javascript) και έχει προτιμηθεί για το εύρος των βιβλιοθηκών και των δυνατοτήτων που παρέχει στον web developer.

## Installation

### Frontend

#### Install NodeJS
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Install Angular/CLI
```
npm install -g @angular/cli
npm update
```

#### Install dependencies
Ύστερα από pull ενός angular project, προκειμένου να εγκατασταθούν όλα τα απαραίτητα dependencies
```
npm install
```

#### Run project locally
(Χρήση του flag -o για άνοιγμα browser tab)
```
ng s -o
```

#### Download data files
Το συγκεκριμένο project χρησιμοποιεί δεδομένα που προέρχονται από το https://clinicaltrials.gov/.
Συγκεκριμένα, γίνεται χρήση ενός μεγάλου αρχείου (1.5GB) που περιέχει XML αρχεία με όλα τα δεδομένα που είναι public.

``` 
wget https://clinicaltrials.gov/AllPublicXML.zip
mv AllPublicXML.zip /path_To_Appathon/
unzip AllPublicXML.zip
```

Τα παραπάνω θα κατεβάσουν και θα αποσυμπιέσουν τα δεδομένα στο κατάλληλο directory (τροποποιήστε το directory στην εντολή κατάλληλα).
Ωστόσο, όλα τα XML αρχεία ανήκουν στο .gitignore, οπότε δεν θα ελέγχονται από το git.


### Backend

#### Install python3
```
sudo apt install python3
```

#### Install pipenv virtual environment
```
pip3 install pipenv
```

### Activate virtual environment
Inside backend/ direcotry
```
pipenv shell
```

### Install all dependencies from Pipfile
```
pipenv install
```

### Run the backend application
```
python3 run.py
```
