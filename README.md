### pNode's Wireless Sensor Network Backend

#### API

A reference for the API is found below. Every device has a unique access token that allows it to push data to the server via JSON Web Token (JWT) authentication.


| Type   |      URI      |  Description |
|----------|-------------|------|
| POST |  api/devices | create a new device |
| POST | api/renew/DEV_ID | renews device token |
| GET |    api/devices   | get all devices |
| GET | api/devices/DEV_ID | returns single device |
| GET | api/update/DEV_ID | update device |

| Type   |      URI      |  Description |
|----------|-------------|------|
| GET |    api/words  | returns expanded word list |
| GET | api/w | returns minified word list |
| GET | api/populate | populate words for spreadsheet |


**Example response:**

api/devices/0x0002
````
{
 	"_id": "5a4d3912bbd78e29caaec4a7",
 	"name": "0x0002",
 	"active": false,
 	"lastUpdate": "2018-02-21T19:02:00.000Z",
 	"location": "R1",
 	"__v": 0,
 	"lastMotion": "2018-02-21T19:01:59.000Z"
 }
````

api/devices/
````
[{
	"_id": "5a2da030dfa0f43150bafb84",
	"name": "0x0001",
	"active": false,
	"lastUpdate": "2019-03-18T21:38:45.000Z",
	"location": "L2C",
	"__v": 0,
	"lastMotion": "2019-03-18T21:38:38.000Z"
}, {
	"_id": "5a4d3912bbd78e29caaec4a7",
	"name": "0x0002",
	"active": false,
	"lastUpdate": "2018-02-21T19:02:00.000Z",
	"location": "R1",
	"__v": 0,
	"lastMotion": "2018-02-21T19:01:59.000Z"
}]
````
