## RUN THE FOLLOWING COMMANDS TO INSTALL NODE MODULES FOR RUNNING THE TESTS

- npm install
- npm install @cucumber/cucumber
- npx playwright install
# Delete Cypress folder from node_modules\multiple-cucumber-html-reporter\examples
- rm -rf node_modules/multiple-cucumber-html-reporter/examples/cypress 

## Formatting with Prettier

- We will use the "Prettier" VS Code extension to autoformat our code.
- Prettier rules can be modified in the `.prettierrc` file.
- To run Prettier on all files, run the following from the root directory:

  `npx prettier --write .`

- To run Prettier on all files in a specific directory, run the following from the root directory:

  `npx prettier --write "./project_Web/**/*.js"`

  - This will execute Prettier on all `.js` files in the `project_Web` directory.

- All files should be formatted with Prettier prior to PR submission.

- Keyboard shortcut to run prettier:
  - **Windows**: Shift + Alt + F
  - **Mac**: Shift + Option + F

## Linting with ESLint

- We will use the "ESLint" VS Code extension to see linting errors in our code.
- ESLint rules can be modified in the `.eslintrc.js` file.
- Linting errors should be corrected and not ignored or commented out (some exceptions may apply).
- All ESLint errors should be resolved prior to PR submission.
- To run `eslint` commands from the terminal, you will first have to install ESLint globally by running:
  - `npm install -g eslint`
- To see where ESLint errors are occurring, run the following from the root directory:

  - **Windows**: `eslint .`
  - **Mac**: `npx eslint .`

## Winston Logger

- Winston is a simple and universal logging library with support for multiple transports.
- A transport is essentially a storage device for your logs.
- Each Winston logger can have multiple transports configured at different levels.
- Please refer to the official Winston documentation for more information
- npm install --savedev winston
- npm install --savedev winston-daily-rotate-file
## Execution Guide

### Features
A feature file is a key component of Behavior-Driven Development (BDD) frameworks like Cucumber. It contains the specifications of the software behavior written in a human-readable format using the Gherkin language.

## Running Cucumber Feature Files

### On Windows and Mac

1. **Run All Feature Files**:
   - Open Terminal (Mac) or Command Prompt (Windows).
   - Use the following command to run all feature files:
     ```sh
     npx cucumber-js project_Web/features
     ```

2. **Run a Specific Feature File**:
   - Open Terminal (Mac) or Command Prompt (Windows).
   - Use the following command to run a specific feature file:
     ```sh
     npx cucumber-js project_Web/features/(FeatureFileName).feature
     ```

### Examples:

1. **Run All Feature Files**:
   ```sh
   npx cucumber-js project_Web/features
2.  **Run SupportRequest.feature**:
   ```sh
   npx cucumber-js project_Web/features/SupportRequest.feature
   ```
3. **Manually Using the Debug Panel**:

Step-by-Step Guide to Run Configurations from Visual Studio Code UI
Open Visual Studio Code:

Launch Visual Studio Code on your machine.
Open the Debug Panel:

Click on the Debug icon in the Activity Bar on the side of the window. This will open the Debug panel.
Alternatively, you can open the Debug panel by pressing Ctrl+Shift+D (Windows) or Cmd+Shift+D (Mac).
Select the Configuration:

At the top of the Debug panel, you will see a dropdown menu. Click on this dropdown to see the list of available configurations.
Select the configuration you want to run. For example, select Run ProductRegistration.feature to run the ProductRegistration.feature file.
Start Debugging:

Once you have selected the desired configuration, click the green play button (▶) at the top of the Debug panel to start debugging.
Visual Studio Code will execute the command specified in the selected configuration.

By following these steps, you can easily run your Cucumber feature files directly from the Visual Studio Code UI using the configurations specified in your launch.json file.
    

## Running Tagged Scenarios-
Tags in Cucumber are used to filter which scenarios or features to run

### On Windows and Mac
1.**Run Specific Tags**:
Open Terminal (Mac) or Command Prompt (Windows).
Use the following command to run scenarios with a specific tag:
```sh
-npx cucumber-js project_Web/features --tags "@(tagname)"
```
2.**Run Feature Files with Specific Tags**:

Open Terminal (Mac) or Command Prompt (Windows).
Use the following command to run a specific feature file with a specific tag:
```sh
-npx cucumber-js project_Web/features/(feature File Name).feature --tags "@(tagname)"
```
Example Commands

**Run All Scenarios with @E2E Tag**:
```sh
-npx cucumber-js project_Web/features --tags "@E2E"
```
**Run SupportRequest.feature with @E2E Tag**:
```sh
-npx cucumber-js project_Web/features/SupportRequest.feature --tags "@E2E"
```





## Execution Guide

### Features

A feature file is a key component of Behavior-Driven Development (BDD) frameworks like Cucumber. It contains the specifications of the software behavior written in a human-readable format using the Gherkin language.

## Running Cucumber Feature Files

### On Windows and Mac

1. **Run All Feature Files**:

   - Open Terminal (Mac) or Command Prompt (Windows).
   - Use the following command to run all feature files:
     ```sh
     npx cucumber-js project_Web/features
     ```

2. **Run a Specific Feature File**:
   - Open Terminal (Mac) or Command Prompt (Windows).
   - Use the following command to run a specific feature file:
     ```sh
     npx cucumber-js project_Web/features/(FeatureFileName).feature
     ```

### Examples:

1. **Run All Feature Files**:
   ```sh
   npx cucumber-js project_Web/features
   ```
2. **Run SupportRequest.feature**:

```sh
npx cucumber-js project_Web/features/SupportRequest.feature
```

3. **Manually Using the Debug Panel**:

Step-by-Step Guide to Run Configurations from Visual Studio Code UI
Open Visual Studio Code:

Launch Visual Studio Code on your machine.
Open the Debug Panel:

Click on the Debug icon in the Activity Bar on the side of the window. This will open the Debug panel.
Alternatively, you can open the Debug panel by pressing Ctrl+Shift+D (Windows) or Cmd+Shift+D (Mac).
Select the Configuration:

At the top of the Debug panel, you will see a dropdown menu. Click on this dropdown to see the list of available configurations.
Select the configuration you want to run. For example, select Run ProductRegistration.feature to run the ProductRegistration.feature file.
Start Debugging:

Once you have selected the desired configuration, click the green play button (▶) at the top of the Debug panel to start debugging.
Visual Studio Code will execute the command specified in the selected configuration.

By following these steps, you can easily run your Cucumber feature files directly from the Visual Studio Code UI using the configurations specified in your launch.json file.

## Running Tagged Scenarios-

Tags in Cucumber are used to filter which scenarios or features to run

### On Windows and Mac

1.**Run Specific Tags**:
Open Terminal (Mac) or Command Prompt (Windows).
Use the following command to run scenarios with a specific tag:

```sh
-npx cucumber-js project_Web/features --tags "@(tagname)"
```

2.**Run Feature Files with Specific Tags**:

Open Terminal (Mac) or Command Prompt (Windows).
Use the following command to run a specific feature file with a specific tag:

```sh
-npx cucumber-js project_Web/features/(feature File Name).feature --tags "@(tagname)"
```

Example Commands

**Run All Scenarios with @E2E Tag**:

```sh
-npx cucumber-js project_Web/features --tags "@E2E"
```

**Run SupportRequest.feature with @E2E Tag**:

```sh
-npx cucumber-js project_Web/features/SupportRequest.feature --tags "@E2E"
```
