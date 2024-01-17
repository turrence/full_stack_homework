# make files run the commands in a separte shell before

SHELL = /bin/bash

VENV := ../.venv
PYTHON := $(VENV)/Scripts/python.exe
ACTIVATE = . $(VENV)/Scripts/activate
PIP = $(VENV)/Scripts/pip.exe

run:
	hug -f main.py

$(VENV):
	python3 -m venv $(VENV)

venv: $(VENV)

activate:
	$(ACTIVATE)

install: venv
	$(ACTIVATE); $(PIP) install -r requirements.txt