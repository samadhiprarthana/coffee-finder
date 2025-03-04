<?php
// Include database connection
include 'db.php';

header('Content-Type: application/json');

try {
    // Fetch testimonials from the database
    $stmt = $conn->query("SELECT name, message, rating FROM testimonials ORDER BY id DESC");
    $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($testimonials);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to fetch testimonials."]);
}
?>
