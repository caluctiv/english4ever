<?php
// login.php - Assure-toi que ton serveur supporte HTTPS et protège les données
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Exemple d'un utilisateur stocké dans une base de données avec un mot de passe haché
$storedPasswordHash = '$2y$10$V8b4Cf2lhjq9ePtZ7qunTeFkzt5SThJEPdoVJf5H5LCT7zB0cpaK'; // password123

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if (password_verify($password, $storedPasswordHash)) {
        // Mot de passe correct, renvoyer une réponse JSON avec succès
        echo json_encode(['success' => true]);
    } else {
        // Mot de passe incorrect
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>
