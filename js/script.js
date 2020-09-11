class array {
    constructor () {
        this.length = 0;
        this.data = [];
    }

    getElementAt(index){
        return data[index];
    }
    
    // TODO: 
    // create a set element function

    append(value){
        this.data.push(value);
        this.length++;
    }
    
    delete(index) {
        if (index > -1) {
            this.data.splice(index, 1);
        }
        this.length --;
    }

    linearSearch(key) {
        //TODO:
        // get this to work with animations
        let index = -1;

        for (let i = 0; i < this.length; i++ ) {
            if (this.data[i] == key) {
                index = i;
                break;
            }
        }
        return index;
    }

    binarySearch(key) {

        let l = 0;
        let r = this.length - 1;

        let mid;
        while (l <= r) {

            mid = Math.round((l + r) / 2);

            if (this.data[mid] == key) {
                return mid;
            }
            else if(this.data[mid] < key) {
                l = mid + 1;
            }
            else {
                r = mid - 1;
            }
        }

        // we didnt find the key return not found
        return -1;
    }

    sort() {
        this.data.sort(function(a,b){return a - b});
    }

    display(){
        console.log(this.data);
    }
}



function generateRandomArray(callback) {

    let arr = new array();
    // generate 10 random numbers (range: 1 - 100) and append them onto array
    let i = 0;

    while (i < 10) {
        let randomNum = Math.floor(Math.random() * 101);

        if(arr.linearSearch(randomNum) == -1) {
            arr.append(randomNum);
            i++;
        }
        else {
            continue;
        }
    }

    if (typeof callback == "function") {
        callback(arr);
    }

    return arr;
}


function removeRenderedArray() {
    $(`.array-element`).hide('slow', function() {
        $(`.array-element`).remove();
    });

}

function renderStoredArray(arr) {
    let arrayElement;
    // first clear any array that is currently being displayd

    $(`.array-element`).remove();

    for (let i = 0; i < arr.length; i ++) {
        // create a div element with the class of array-element
        arrayElement = document.createElement("div");
        arrayElement.className = `array-element index-${i}`;
        arrayElement.innerHTML = arr.data[i];

        // append each array element onto the display section
        // TODO NOT IMPORTANT:
        // add an animation for the display  
        $(".display-area").append(arrayElement);
    }
    
}

function deleteItem(arr, index, callback) {
   
    // Delete items only when there's 1 or more elments
    if (arr.length > 0) {
        let arrayElement = document.createElement("div");
        arrayElement.innerHTML = $(`.array-element.index-${index}`).html();

        // delete from rendered array
        $(`.array-element.index-${index}`).remove();

        // delete item from stored array
        arr.delete(index);

        //TODO: UNCOMMENT THIS WHEN YOU"RE READY 
        $(".display-area2").append(arrayElement);

        if (typeof callback == "function") {
            callback(arr);
        }
    }

    else {
        // TODO NON IMPORTANT: 
        // change this from being an alert to a small pop up window that will go away
        // when the user clicks off of it

        alert("There must be at least 1 item in array to perform deletion");
    }

    // referenced this for the callback part
    // https://www.geeksforgeeks.org/how-to-create-a-custom-callback-in-javascript/#:~:text=All%20functions%20in%20JavaScript%20are,keyword%20as%20the%20last%20parameter.

}

function addItem(arr,value,callback) {
    let arrayElement;

    //TODO:
    // change this so that the user input comes from a form with an input field
    // rather than using prompt to grab user input

    //prompt user for the number to add
    // let elementToBeAdded = parseInt(prompt("what number to do you want to add to your array"));

    // TODO: add input handling
    elementToBeAdded = value;
    // check if array is at max size
    // if its not at max size then append to array and re render

    if (arr.length >= 10) {
        alert("No more room in array!");
    }
    else {

        console.log("creading div to add to display");
        //create the new div that will enclose the new array item
        arrayElement = document.createElement("div");
        // add class name based on the current length of the array
        arrayElement.className = `array-element index-${arr.length}`;
        // change the contents of the new div to the number given by the user
        arrayElement.innerHTML = elementToBeAdded;
        // add div to display container
        $(".display-area").append(arrayElement);

        console.log("done appending to display");

    }

    // append to stored array
    arr.append(elementToBeAdded);
}

const algoApp = {};


algoApp.init = () => {
    // function calls
    // on click events
    console.log("inside init");
    
    let arr = new array();

    // TODO:
    // validate the user input to 
    // make sure that they dont add something that they shouldnt/cant into the array
    // the user must input a number
    // the user can't delete from arrays with a length of 0  
    $(".add-item-form").on("submit", function(e) {
        e.preventDefault();
        const value =  parseInt($(".add-item-input").val());

        
        console.log("adding item...");
        console.log(value);

        addItem(arr, value);
        // clear the input
        $(".add-item-input").val("");
    });

    // TODO:
    // validate the user input to 
    // make sure that they dont delete something that they shouldnt/cant from the array
    // the user must input a number
    $(".delete-item-form").on("submit", (e) => {
        e.preventDefault();
        const value =  parseInt($(".delete-item-input").val());

        if (!value) {
            alert("Index must be given");
        }
        else {
            console.log("deleting item..");
            
            deleteItem(arr, value, arr => { renderStoredArray(arr); });

            // clear the input
            $(".delete-item-input").val("");
        }

    });

    $(".generate-array").on('click', function() {
        arr = generateRandomArray(function(arr) {
            console.log(arr.data);
            renderStoredArray(arr);
        });

    });

    // $(".delete-item-button").on('click', function() {
    //     deleteItem(arr, function(arr) {
    //         // refresh the sorted array to fix the index classname
    //         renderStoredArray(arr);
    //     });
    // });

    // change this so that it works on a submit event
    // then passes the value from the input field
    // through to the function as a variable named value


    // $(".add-item-button").on('click',function() {

    //     addItem(arr);
    // });

}

$(document).ready(function(){

    console.log("document ready");
    
    algoApp.init();
});




//TODO #GENERAL
// change functions to arrow syntax

