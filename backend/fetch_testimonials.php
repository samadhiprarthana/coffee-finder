<?php
include 'db.php';

$sql = "SELECT * FROM testimonials ORDER BY created_at DESC";
$result = $conn->query($sql);

$testimonials = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $testimonials[] = $row;
    }
}

echo json_encode($testimonials);
$conn->close();
?>
