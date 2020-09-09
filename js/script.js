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
    // first clear any array that is currently being displayed

    $(`.array-element`).remove();

    for (let i = 0; i < arr.length; i ++) {
        // create a div element with the class of array-element
        arrayElement = document.createElement("div");
        arrayElement.className = `array-element index-${i}`;
        arrayElement.innerHTML = arr.data[i];

        // append each array element onto the display section
        // TODO:
        // add an animation for the display  
        $(".display").append(arrayElement);
    }
    
}

function deleteItem(arr, callback) {
   
    //TODO:
    // change this so that we get user input from a form with an input field
    // rather than grabbing it from a prompt

    // grab desired index from user via prompt
    const index = parseInt(prompt("which element do you want to remove?"));

    arr.delete(index);

    $(`.array-element.index-${index}`).hide('slow');

    // referenced this for the callback part
    // https://www.geeksforgeeks.org/how-to-create-a-custom-callback-in-javascript/#:~:text=All%20functions%20in%20JavaScript%20are,keyword%20as%20the%20last%20parameter.

    if (typeof callback == "function") {
        callback(arr);
    }

    // return arr;
}

function addItem(arr,value,callback) {
    let arrayElement;

    //TODO:
    // change this so that the user input comes from a form with an input field
    // rather than using prompt to grab user input

    //prompt user for the number to add
    let elementToBeAdded = parseInt(prompt("what number to do you want to add to your array"));

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
        $(".display").append(arrayElement);

        console.log("done appending to display");

    }

    // append to stored array
    arr.append(elementToBeAdded);
}

$(document).ready(function(){

    console.log("document ready");

    let arr = new array(); 
    
    $(".generate-array").on('click', function() {
        arr = generateRandomArray(function(arr) {
            console.log(arr.data);
            renderStoredArray(arr);
        });

    });

    $(".delete-item-button").on('click', function() {
        deleteItem(arr, function(arr) {
            // refresh the sorted array to fix the index classname
            renderStoredArray(arr);
        });
    });

    // change this so that it works on a submit event
    // then passes the value from the input field
    // through to the function as a variable named value
    $(".add-item-button").on('click',function() {

        addItem(arr);
    });
});
