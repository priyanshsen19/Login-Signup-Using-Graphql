/*
 collection/Table - Users 
                    - doc1
                    - doc2
*/
 const users = [
    {
        _id:"CLI388",
        firstName:"priyansh",
        lastName:"sen",
        email:"priyansh.s@caralane.com",
        password:"12345"
    },
    {
        _id:"CLI231",
        firstName:"ayush",
        lastName:"joshi",
        email:"ayush.j@caratlane.com",
        password:"12346"
    },
    {
        _id:"CLI322",
        firstName:"aditya",
        lastName:"pandit",
        email:"adiyta.p@caratlane.com",
        password:"12346"
    },
    {
        _id:"CLI423",
        firstName:"kps",
        lastName:"shivratna",
        email:"kps.shivratna@caratlane.com",
        password:"12346"
    }
]

/*
 collection/Table - tweet 
                        - doc1
                        - doc2
                        - etc
*/

 const tweets = [
    {
        text:"I don't code without coffee",
        by:"CLI388"
    },
    {
        text:"If it works dont touch it",
        by:"CLI388"
    },
    {
        text:"I am feeling good today",
        by:"CLI231"
    },
    {
        text:"taking a day off",
        by:"CLI322"
    },
     {
        text:"fake it till you make it",
        by:"CLI423"
    }

] 
module.exports = {tweets,users}