<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Charger le fichier JSON contenant les utilisateurs
    $users = json_decode(file_get_contents('users.json'), true)['users'];

    // Vérifier les identifiants
    foreach ($users as $user) {
        if ($user['email'] === $email && $user['password'] === $password) {
            echo "Connexion réussie !";
            exit;
        }
    }

    // Si les identifiants sont incorrects
    echo "Identifiants incorrects.";
}
?>
