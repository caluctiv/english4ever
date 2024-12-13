<?php
// login.php
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Charger les utilisateurs depuis le fichier JSON
$users = json_decode(file_get_contents("users.json"), true);

$authenticated = false;

// Vérifier si l'utilisateur existe
foreach ($users as $user) {
    if ($user['email'] === $email && $user['password'] === $password) {
        $authenticated = true;
        break;
    }
}

// Répondre avec un JSON indiquant le succès ou l'échec
if ($authenticated) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
