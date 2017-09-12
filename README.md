## Complete application sample using: 
* Frontend: 
  * Angular 1
  * Angular Material
  * Gulp
  * Bower
* Backend:
  * Java 8
  * Spring-Security
  * Spring-boot
  * Spring-Data
  * MongoDB
## Setup
### Requirements
* Java 8
* Maven 3.3
* Node and NPM
* MongoDB 3.4
### Step-By-Step
 * Frontend
   * Install gulp
   `npm install -g gulp`
   * Install bower
   `npm install -g bower`
   * Update npm modules
   `npm update`
   * Update bower modules
   `bower update`
   * Start dev server
   `gulp serve`
 * Backend:
   * Get maven dependencies and build the module
     `mvn clean package`
   * Start the jetty embedded server
     `mvn spring-boot:run`





