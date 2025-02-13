<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $message = $_POST["message"];
    $rating = $_POST["rating"];

    $stmt = $conn->prepare("INSERT INTO testimonials (name, message, rating) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $name, $message, $rating);

    if ($stmt->execute()) {
        echo "Testimonial submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
