#!/bin/bash

cd /app
export LABRESERVED_SETTINGS=`pwd`/config/config-local.py
python main.py
