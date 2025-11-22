const object = [
    {
        id: 1,
        isInRoom : false,
        room: null
    },
    {
        id:2,
        isInroom: true,
        room : "room1"
    }
]

const rooms = {
    room1: 0,
    room2: 0
}

object.forEach((e) => {

    if(e.isInroom && e.room && rooms.hasOwnProperty(e.room)){
        if(check(e.room)){
            rooms[e.room]++;
        }
        
    }
    return rooms;
    
})

console.log(rooms);


function check(roomid){
    if(roomid == "room1" && rooms[roomid]==0){
        console.log("full");
        return false;
    }
    else{
        return true;
    }
}