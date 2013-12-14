
# baby names for the whole country
wget http://www.ssa.gov/oact/babynames/names.zip
unzip names.zip -d ./names
rm -r names.zip

# get baby names by state
#- wget http://www.ssa.gov/oact/babynames/namesbystate.zip
#- unzip namesbystate.zip -d ./namesbystate
#- rm -r namesbystate.zip
