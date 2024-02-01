# Epic: Health Management App - "Vitality Vault"

## Description:
The **Vitality Vault** app empowers users to manage their health comprehensively. It offers features to track medications, log daily activities, monitor food intake, and gather insights for informed well-being.

## User Stories:
### User Registration and Profile Creation:
- Allow users to register with the app and create a personalized profile by providing basic information.

### Medication Tracking:
- Enable users to track their medications, including dosage and frequency, and view a chronological record of medication history.

### Visual Health Dashboard:
- Design and implement visual charts and graphs displaying height, weight, and medication history data for a comprehensive health overview.

### Daily Log Entries:
- Implement a daily log feature for users to record meals, snacks, and physical activities, with options to add notes or details.

### Medication Testing and Effects:
- Develop a section for users to test and log the introduction of new medications, recording observed effects and changes in health status.

### Food Monitoring:
- Create functionality for users to log daily food intake, including types of consumed food.

### Sleep Monitoring:
- Develop functionality for users to log daily sleep patterns, allowing input for duration and quality of sleep.


### Community Engagement:
- Implement a community platform for users to connect, share achievements, and participate in discussions on trial progress and results.


## API Endpoints:
| Endpoint                     | HTTP Method | Description                                            |
| ---------------------------- | ------------| ------------------------------------------------------ |
| /register                    | POST        | Register a new user                                    |
| /authenticate                | GET         | Authenticate a user                                    |
| /api/user                    | PUT         | Update user profile                                    |
| /api/categories              | GET         | Retrieve all categories                                |
| /api/categories/{catId}      | GET         | Retrieve a specific category by ID                      |
| /api/logs                    | GET         | Retrieve all logs for the authenticated user            |
| /api/logs/{logId}            | GET         | Retrieve a specific log entry by ID                     |
| /api/logs/published/{trialId}| GET         | Retrieve published logs for a specific trial             |
| /api/logs                    | POST        | Create a new log entry                                  |
| /api/logs/{tid}              | PUT         | Update a specific log entry by ID                       |
| /api/logs/{logId}            | DELETE      | Delete a specific log entry by ID                       |
| /api/logs/date/{date}        | GET         | Retrieve logs for a specific date                       |
| /api/entrytypes              | GET         | Retrieve all log entry types                             |
| /api/entrytypes/{typeId}     | GET         | Retrieve a specific log entry type by ID                |
| /api/entrytypes/category/{categoryName}| GET  | Retrieve log entry types by category                    |
| /api/entrytypes              | POST        | Create a new log entry type                             |
| /api/entrytypes/{typeId}     | PUT         | Update a specific log entry type by ID                  |
| /api/entrytypes/{typeId}     | DELETE      | Delete a specific log entry type by ID                  |
| /api/trials/published        | GET         | Retrieve all published trials                           |
| /api/trials                  | GET         | Retrieve all trials for the authenticated user          |
| /api/trials/{trialId}        | GET         | Retrieve a specific trial by ID                          |
| /api/trials                  | POST        | Create a new trial                                      |
| /api/trials/{trialId}        | PUT         | Update a specific trial by ID                           |
| /api/trials/{trialId}        | DELETE      | Delete a specific trial by ID                           |
| /api/trials/published/{trialId}| POST      | Create a new comment for a specific published trial      |
| /api/units                   | GET         | Retrieve all units                                      |
| /api/units/{unitId}          | GET         | Retrieve a specific unit by ID                           |


## Getting Started:
To get started with the **Vitality Vault** app, follow these steps:
- Register an account
- Update your profile with desired information
- Begin adding daily log entries. Search for Entry Types or create your own
- If desired, start a trial for any new diet, workout, or medication you are using
- Enjoy!


## Technologies Used:
### Frontend:
- Angular
- HTML5
- CSS3
- TypeScript
- Bootstrap
- DOM, AJAX, XHR, JSON

### Backend:
- Java
- Spring Boot
- Spring Data
- SQL
- REST

### Additional Technologies:
- Javascript
- Trello (Project Management)
- Agile (Development Methodology)
- Figma (Design)
