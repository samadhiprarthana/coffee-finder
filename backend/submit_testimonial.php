<?php 
// Include database connection
include 'db.php';

header('Content-Type: application/json');

// Validate and sanitize inputs
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
$rating = isset($_POST['rating']) ? intval($_POST['rating']) : 0;

// Check if inputs are valid
if (empty($name) || empty($message) || $rating < 1 || $rating > 5) {
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
    exit;
}

try {
    // Insert testimonial into database
    $stmt = $conn->prepare("INSERT INTO testimonials (name, message, rating) VALUES (:name, :message, :rating)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':message', $message);
    $stmt->bindParam(':rating', $rating);
    $stmt->execute();

    // Return success response
    echo json_encode(["status" => "success", "message" => "Testimonial added successfully."]);
} catch (PDOException $e) {
    // Return error response
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
