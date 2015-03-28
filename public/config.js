System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.15",
    "angular-messages": "github:angular/bower-angular-messages@1.3.15",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.15"
    }
  }
});

