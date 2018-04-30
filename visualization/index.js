var json_data = [
    {
        "_id": {
            "$oid": "5adfc7b94e1a0f1b1427afee"
        },
        "friends": [
            {
                "_id": {
                    "$oid": "5adfc7c54e1a0f1b1427afef"
                },
                "friends": [
                    {
                        "$oid": "5add11cdb57f720048e334e3"
                    }
                ],
                "posts": [
                    {
                        "$oid": "5adfc8764e1a0f1b1427b000"
                    },
                    {
                        "$oid": "5adfc87c4e1a0f1b1427b001"
                    },
                    {
                        "$oid": "5adfc8804e1a0f1b1427b002"
                    }
                ],
                "email": "abdo@test.com",
                "name": "Abdelrhman Mahmoud",
                "password": "admin12345",
                "__v": 3
            }
        ],
        "posts": [
            {
                "$oid": "5adfc8474e1a0f1b1427affa"
            },
            {
                "$oid": "5adfc84b4e1a0f1b1427affb"
            },
            {
                "$oid": "5adfc8534e1a0f1b1427affc"
            }
        ],
        "email": "yasin@test.com",
        "name": "Abdelrhman Yassin",
        "password": "admin12345",
        "__v": 3
    },
    {
        "_id": {
            "$oid": "5adfc7c54e1a0f1b1427afef"
        },
        "friends": [
            {
                "_id": {
                    "$oid": "5adfc7b94e1a0f1b1427afee"
                },
                "friends": [
                    {
                        "_id": {
                            "$oid": "5adfc7c54e1a0f1b1427afef"
                        },
                        "friends": [
                            {
                                "$oid": "5add11cdb57f720048e334e3"
                            }
                        ],
                        "posts": [
                            {
                                "$oid": "5adfc8764e1a0f1b1427b000"
                            },
                            {
                                "$oid": "5adfc87c4e1a0f1b1427b001"
                            },
                            {
                                "$oid": "5adfc8804e1a0f1b1427b002"
                            }
                        ],
                        "email": "abdo@test.com",
                        "name": "Abdelrhman Mahmoud",
                        "password": "admin12345",
                        "__v": 3
                    }
                ],
                "posts": [
                    {
                        "$oid": "5adfc8474e1a0f1b1427affa"
                    },
                    {
                        "$oid": "5adfc84b4e1a0f1b1427affb"
                    },
                    {
                        "$oid": "5adfc8534e1a0f1b1427affc"
                    }
                ],
                "email": "yasin@test.com",
                "name": "Abdelrhman Yassin",
                "password": "admin12345",
                "__v": 3
            }
        ],
        "posts": [
            {
                "$oid": "5adfc8764e1a0f1b1427b000"
            },
            {
                "$oid": "5adfc87c4e1a0f1b1427b001"
            },
            {
                "$oid": "5adfc8804e1a0f1b1427b002"
            }
        ],
        "email": "abdo@test.com",
        "name": "Abdelrhman Mahmoud",
        "password": "admin12345",
        "__v": 3
    }

]




var Dracula = require('graphdracula');
var Graph = Dracula.Graph;
var Renderer = Dracula.Renderer.Raphael;
var Layout = Dracula.Layout.Spring;
var graph = new Graph();
for(i=0;i<json_data.length;i++){
    graph.addEdge(json_data[0].name,json_data[0].friends[0].name);
}

var layout = new Layout(graph)
var renderer = new Renderer('#paper', graph, 400, 300);
renderer.draw()