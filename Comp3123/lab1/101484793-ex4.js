function angle_Type(angle) {
    if (angle < 90) return "Acute angle";
    if (angle === 90) return "Right angle";
    if (angle < 180) return "Obtuse angle";
    if (angle === 180) return "Straight angle";
    return "Invalid angle";
}

console.log(angle_Type(47));
console.log(angle_Type(90));
console.log(angle_Type(145));
console.log(angle_Type(180));