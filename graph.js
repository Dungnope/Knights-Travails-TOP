/* A Queue object for queue-like functionality over JavaScript arrays. */
let Queue = function() {
    this.items = [];
};
Queue.prototype.enqueue = function(obj) {
    this.items.push(obj);
};
Queue.prototype.dequeue = function() {
    return this.items.shift();
};
Queue.prototype.isEmpty = function() {
    return this.items.length === 0;
};

/*
 * Performs a breadth-first search on a graph
 * @param {array is possible path} graph - Graph, represented as adjacency lists.
 * @param {number} source - The index of the source vertex.
 * @returns {array} Array of objects describing each vertex, like
 *     [{distance: _, predecessor: _ }]
 */
let knightWalk = function(position){ //get all possible path
    let listPath = [];
    const possiblePast = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [1, -2],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [-1, -2],
    ]

    //take all possible path
    for(let i = 0; i < possiblePast.length; i++){
        let moveX = position[0] + possiblePast[i][0];
        let moveY = position[1] + possiblePast[i][1];
        if(moveX < 8 && moveX >= 0 && moveY < 8 && moveY >= 0){
                listPath.push([moveX, moveY]);
        }
    }

    return listPath;

}

function knightMoves(start, end){
    let steps = 0;
    let shortestPath = [];
    
    if(start[0] === end[0] && start[1] === end[1]) return {distance: `You made it in ${steps} moves!  Here's your path:`, path: [start]};


    //this function take the end position and find the oldest predecessor, return steps and [..., x, y pos] from start to end shortest path
    function getStepPosition(moveStep, start, previousNode){

        //take the distance of the end point on board and assign as step number for shortest path
        if(steps === 0)
        {
            steps = previousNode.distance;
        }

        //push travailed position from end to start
        shortestPath.push(previousNode.predecessor);

        //take the predecessor step and then recursive
        previousNode = moveStep.get(`[${previousNode.predecessor[0]}, ${previousNode.predecessor[1]}]`);

        //if find the start point return answer
        if(previousNode.predecessor === start) {
            shortestPath.push(start);

            //reverse from start point end point on board
            shortestPath.reverse();
            return {distance: `You made it in ${steps} moves!  Here's your path:`, path: shortestPath};
        }
        

        return getStepPosition(moveStep, start, previousNode);
    }

    //queue for step process BFS
    let wait = new Queue();

    //to take predecessor and distance(step) and check it go through or not
    let moveStep = new Map();
    moveStep.set(`[${start[0]}, ${start[1]}]`, {predecessor: null, distance: 0});

    //add start point for move
    wait.enqueue(start);

    while(!wait.isEmpty())
    {
        //take first elemement of queue
        let move = wait.dequeue();
        //src for 
        let src = `[${move[0]}, ${move[1]}]`;

        //take all step from src position of knight
        let allStep = knightWalk(move);

        //take neighbor for next 8 steps of knight travails
        let neighbor = allStep[0];

        //bring all step to the queue
        for(let item of allStep){
            if(!moveStep.has(`[${item[0]}, ${item[1]}]`))
            {
                moveStep.set(`[${item[0]}, ${item[1]}]`, {predecessor: move, distance: moveStep.get(src).distance + 1});
                wait.enqueue(item);

                //check find the end position
                if(item[0] === end[0] && item[1] === end[1]){
                    let endStep = moveStep.get(`[${item[0]}, ${item[1]}]`);

                    //add the end to path
                    shortestPath.push(end);

                    return getStepPosition(moveStep, start, endStep);
                }
            }   
        }

        //get steps of all steps after start step
        for(let step of knightWalk(neighbor)){
            wait.enqueue(step);
        }
    }
}

function printAns(knightTravails){
    console.log(knightTravails.distance);
    knightTravails.path.forEach((item) => {
    console.log(item);
})
}


printAns(knightMoves([4, 3], [4, 3]));