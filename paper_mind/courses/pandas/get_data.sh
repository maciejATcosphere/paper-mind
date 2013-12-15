
# baby names for the whole country
wget http://www.ssa.gov/oact/babynames/names.zip
unzip names.zip -d ./names
rm names.zip

wget http://files.grouplens.org/datasets/movielens/ml-1m.zip
unzip ml-1m.zip -d ./movielens
rm ml-1m.zip

# get baby names by state
#- wget http://www.ssa.gov/oact/babynames/namesbystate.zip
#- unzip namesbystate.zip -d ./namesbystate
#- rm -r namesbystate.zip
