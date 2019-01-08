#!/usr/bin/env bash
# Shell Script to create the folder structure for a module.
# Input - Module name [all lowecase]

echo "Insert the title of the module in all lower case: "
read title

reducer="Reducer.js"
saga="Saga.js"
screen="Screen.js"
capitalizedTitle="$(tr '[:lower:]' '[:upper:]' <<< ${title:0:1})${title:1}"

mkdir $title
cd $title
mkdir actions
cd actions
echo "" > Types.js
cd ..
mkdir components
mkdir containers
mkdir reducers
cd reducers
echo "" > $capitalizedTitle$reducer
cd ..
mkdir sagas
cd sagas
echo "" > $capitalizedTitle$saga
cd ..
mkdir screens
cd screens
echo "" > $capitalizedTitle$screen
