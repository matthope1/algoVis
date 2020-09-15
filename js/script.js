class array {
    constructor () {
        this.length = 0;
        this.data = [];
    }

    getLength() {return this.length};

    getElementAt(index){
        // check if index is within range
        if (index >= 0 && index < this.length) {
            return data[index];
        }
    }
    
    setElementAt(index, value) {
        // todo: check if index is within range
        // check if value is a number first
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

    let arrayBox;

    //todo:
    // see if there's a better way of doing this
    // try to find alternate solution rather than making a ae box and the ae box seperately

    // first clear the array that is currently being displayd
    $(`.array-element`).remove();
    $(".array-element-box").remove();

    for (let i = 0; i < arr.getLength(); i ++) {
        arrayBox = $("<div></div>").addClass("array-element-box");
        arrayElement = $("<h2></h2>").text(arr.data[i]).addClass(`array-element index-${i} grow`)

        // TODO NOT IMPORTANT:
        // add an animation for the display  
        $(arrayBox).append(arrayElement, $(`<p>[${i}]</p>`));

        $(".display-area").append(arrayBox);
    }


    // remove any currently rendered infromation
    $(`.display-info`).empty();

    let infoElement = $("<h2></h2>").text("length of array: " + arr.getLength()).addClass("info-element");
    $(`.display-info`).append(infoElement);
}

function deleteItem(arr, index, callback) {
   
    // Delete items only when there's 1 or more elments
    if (arr.length > 0 && (index >= 0 && index < arr.length)) {
        //TODO:
        // change this to use jquery instead of js dom manipulation
        let arrayElement = document.createElement("div");
        arrayElement.innerHTML = $(`.array-element.index-${index}`).html();


        // delete item from stored array
        arr.delete(index);

        $(".display-area2").append(arrayElement);

        if (typeof callback == "function") {
            callback(arr);
        }
    }

    else {
        // TODO NON IMPORTANT: 
        // change this from being an alert to a small pop up window that will go away
        // when the user clicks off of the pop up
        alert("There must be at least 1 item in array to perform deletion and the given index must be within range of the array length");
    }

    // referenced this for the callback part
    // https://www.geeksforgeeks.org/how-to-create-a-custom-callback-in-javascript/#:~:text=All%20functions%20in%20JavaScript%20are,keyword%20as%20the%20last%20parameter.

}

function addItem(arr,value,callback) {
    //TODO:
    // change alerts to pop up boxes?
    // fix this, it renders a div instead of an array box and array element
    //TODO:
    // add input handling
    // dont let users add numbers more than 999 for styling reasons
    let arrayElement;
    let arrayBox;

    elementToBeAdded = value;

    if (arr.length >= 10) {
        alert("No more room in array!");
    }
    else if (value > 999 || value < 0) {
        alert("Please enter a value from 0 to 999 inclusive");
    }
    else {
        // append to stored array
        arr.append(elementToBeAdded);

        arrayBox = $("<div></div>").addClass("array-element-box");

        arrayElement = $("<h2></h2>").text(elementToBeAdded).addClass(`array-element index-${arr.getLength() - 1} grow`);

        $(arrayBox).append(arrayElement, $(`<p>[${arr.getLength() - 1}]</p>`));

        $(".display-area").append(arrayBox);

    }

}

const algoApp = {}

algoApp.init = () => {
    
    let arr = new array();

    arr = generateRandomArray((arr) => { renderStoredArray(arr) });
    // add item
    $(".add-item-form").on("submit", (e) => {
        e.preventDefault();
        const value =  parseInt($(".add-item-input").val());


        if (typeof value != 'number') {
            alert("A number must be given!");
            $(".add-item-input").val("");
        }
        else {
            addItem(arr, value);
            //clearing the input
            $(".add-item-input").val("");
        }

    });

    // delete item
    $(".delete-item-form").on("submit", (e) => {
        e.preventDefault();
        const value =  parseInt($(".delete-item-input").val());


        if (typeof value != 'number') {
            alert("Index must be given");
        }
        else {
            deleteItem(arr, value, arr => { renderStoredArray(arr) });
            // clearing the input 
            $(".delete-item-input").val("");
        }
    });

    $(".generate-array-form").on('submit', (e) => {
        e.preventDefault();
        arr = generateRandomArray((arr) => { renderStoredArray(arr) });
    });

    $(".sort-array-form").on('submit', (e) => {
           e.preventDefault();
           console.log("called sort");
           arr.sort();
           renderStoredArray(arr);
    });

}

$(document).ready(function(){

    
    algoApp.init();
});



