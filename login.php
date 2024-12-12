<?php
// login.php
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Vérification simple sans hachage
if ($email == "user@example.com" && $password == "password123") {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
