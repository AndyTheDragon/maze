export default function shuffle(arr) {
    for (let i=0; i<arr.length-2; i++) {
        const j = i + Math.floor(Math.random() * (arr.length - i));
        //[arr[i], arr[j]] = [arr[j], arr[i]];
        swap(i, j);
    }
    return arr;

    function swap(i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
