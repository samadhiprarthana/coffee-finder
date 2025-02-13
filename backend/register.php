<?php
require 'db.php'; // Include database connection
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON Data
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['username'], $data['email'], $data['password'])) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    $username = trim($data['username']);
    $email = trim($data['email']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    try {
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $password]);

        echo json_encode(["status" => "success", "message" => "Registration successful"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Registration failed: " . $e->getMessage()]);
    }
}
?>
