class array {
    constructor () {
        this.length = 0;
        this.data = [];
    }

    getElementAt(index){
        return data[index];
    }
    
    setElementAt(index, value) {
        data[index] = value;
    }

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
    if (arr.length > 0 && (0 < index < 10)) {
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
        // when the user clicks off of the pop up
        alert("There must be at least 1 item in array to perform deletion and the given index must be within range 0-9");
    }

    // referenced this for the callback part
    // https://www.geeksforgeeks.org/how-to-create-a-custom-callback-in-javascript/#:~:text=All%20functions%20in%20JavaScript%20are,keyword%20as%20the%20last%20parameter.

}

function addItem(arr,value,callback) {
    let arrayElement;

    elementToBeAdded = value;

    if (arr.length >= 10) {
        alert("No more room in array!");
    }
    else {
        //create the new div that will enclose the new array item
        arrayElement = document.createElement("div");
        // add class name based on the current length of the array
        arrayElement.className = `array-element index-${arr.length}`;
        // change the contents of the new div to the number given by the user
        arrayElement.innerHTML = elementToBeAdded;
        // add div to display container
        $(".display-area").append(arrayElement);
    }

    // append to stored array
    arr.append(elementToBeAdded);
}

const algoApp = {};


algoApp.init = () => {
    
    let arr = new array();
    $(".add-item-form").on("submit", (e) => {
        e.preventDefault();
        const value =  parseInt($(".add-item-input").val());

        if (!value || typeof value != 'number') {
            alert("A number must be given!");
            $(".add-item-input").val("");
        }
        else {
            addItem(arr, value);
            //clearing the input
            $(".add-item-input").val("");
        }

    });

    $(".delete-item-form").on("submit", (e) => {
        e.preventDefault();
        const value =  parseInt($(".delete-item-input").val());

        if (!value) {
            alert("Index must be given");
        }
        else {
            deleteItem(arr, value, arr => { renderStoredArray(arr) });
            // clearing the input 
            $(".delete-item-input").val("");
        }
    });

    $(".generate-array").on('click', () => {
        arr = generateRandomArray((arr) => { renderStoredArray(arr) });
    });

}

$(document).ready(function(){

    // console.log("document ready");
    
    algoApp.init();
});




//TODO #GENERAL
// change functions to arrow syntax

