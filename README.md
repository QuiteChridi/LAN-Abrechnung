# LAN-Party Manager
Tested on Windows 10/11 and Linux Debian 11/Ubuntu 22.04

# Features
- Member regestration & administration
- Powerplug monitoring & administration
- Buffet Buying & Managment
- Advanced permission and group managment with custom groups
- Pushnotifications
- Dynamic cost calculation by user
- Food order managment
- Fully translated
- Invoices
- Donations

# Requirements
- NodeJS 16 or above
- PostgreSQL
- PM2 Process Manager
- InfluxDB 2.0 (Optional)

# Installation
- Clone this repo
- Run `node install.js`
- Build the plugclient

# API

### WebServer
| Methode | Route | Permissions | Parameter | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| POST | /check | - | - | Will check if your token is valid |

### PlugServer
| Methode | Route | Permissions | Parameter | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET | / | - | - | Show Stats of the Relay |
| GET | /raw | - | - | Show Raw Data of the Relay |

# Permissions
Every route or group of routes got a set permission, a list is here:
Admin:
| Permission | Description |
| ------------- | ------------- |
|admin_all| Permissions to everything|
|admin_bestellungen| Can manage group food orders|
|admin_finanzen| Can see money related information|
|admin_inventory| Can see the entire inventora and donations made|
|admin_strom| Can set the state of every plug and can request them|
|admin_user| Can manage users
|admin_permissions| Can manage permissions
User:
| Permission | Description |
| ------------- | ------------- |
|user_bestellungen| Can order food if got the orderid|
|user_finanzen| Can see his own money|
|user_inventory| Can see inventory and donations|
|user_strom| Can see his own powerusage|
|user_user| Can see other party members|