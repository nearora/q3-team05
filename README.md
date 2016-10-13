DevOps & CNA Q3 Training Tests
==============================

This is a shell project to run basic API tests against the Q3 DevOps & CNA
training project.

Getting Started (with sample code)
----------------------------------

The sample service implementation in this project is written in Node.js, but
that is not a requirement, it's simply a sample.  Any programming language,
platform, or packaging mechanism may be used for the project, as long as the
REST services satisfy the tests in this package.

It's probably a good idea to run up the sample code once to see the expected service signatures.

To run the sample Node.js code:

1. Install Node.js

2. Install all dependencies with "npm install"

3. (Recommended) Install nodemon with "npm install -g nodemon"
You can then run "nodemon ." to run the sample code.

Notes on the Sample Code
------------------------

There are //TODO comments in the code where there features that have not been 
implemented (assuming you wish to start from this codebase; as we've said, you 
can implement in any language.)

The sample code is a monolith, not true micro services.  A proper CNA app should
be refactored into independent, separately running services. That task is left
for teams to take on.

The sample code stores data in an in-memory database.  That will not be required
when all services are fully implemented.

Running the Tests
-----------------

The tests are implemented with Soap UI.  In order to run the tests, first ensure
there is a REST server running with implementations to satisfy the tests.

1. Install SoapUI

   (Via GUI, or
   ```
   {downloaded package, e.g.}/Downloads/SoapUI-x64-5.2.1.sh -q -varfile {full-path-to-this-project}/SoapUI.varfile
   ```

2. Run the test suite:

   ```
   /usr/local/share/SoapUI-5.2.1/bin/testrunner.sh -PPORT=3000 ./Q3-Training-Tests-soapui-project.xml
   ```

   The SoapUI tests have properties that may be set to target your specific 
   implementation (as demonstrated above, by setting the PORT property.

   ```
   PORT: HTTP port to access REST services
   RS_HOST: HTTP host to access the Reservation REST service
   US_HOST: HTTP host to access the Reservation Update REST service (queue reader)
   ```

Development Setup
-----------------

1. Download Go - https://golang.org/dl/
2. Install VirtualBox - https://www.virtualbox.org/wiki/Downloads
3. Install Docker - https://docs.docker.com/docker-for-mac/
4. Install SoapUI - https://www.soapui.org/downloads/soapui.html
4. Install and start journal

         export GOPATH=${HOME}/go
         cd ${HOME}/go
         mkdir -p $GOPATH/src/github.com/tdhite
         cd $GOPATH/src/github.com/tdhite
         git clone http://gerrit.eng.vmware.com:8080/q3-training-journal
         cd q3-training-journal
         make

Q3-Team05 Quickstart
--------------------

1. Setup local environment for development

		sudo easy_install pip
		sudo pip install virtualenv
		mkdir ~/virtual_envs
		virtualenv ~/virtual_envs/q3-team05
		source ~/virtual_envs/q3-team05/bin/activate
		cd /path/to/q3-team05/labreserved
		python setup.py develop

2. Build/Run labreserved in Docker container

		docker build -t labreserved:latest .
		# I use 5001 since my IDE runs API on 5000 when developing
		lab=$(docker run -d -p 5001:5000 labreserved)
		# (Optional) Tail container logs
		docker logs -f $lab

3. Stopping/Removing container

		docker stop $lab
		docker rm $lab

