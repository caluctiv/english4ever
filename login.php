<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Charger les utilisateurs
    $users = json_decode(file_get_contents('users.json'), true)['users'];

    $found = false; // Flag pour vérifier si l'utilisateur existe
    foreach ($users as $user) {
        if ($user['email'] === $email && $user['password'] === $password) {
            $_SESSION['logged_in'] = true;
            $_SESSION['email'] = $email;
            echo "Connexion réussie !";  // Afficher un message de succès
            exit;
        }
    }

    // Si l'utilisateur n'est pas trouvé
    $_SESSION['error'] = 'Identifiant ou mot de passe incorrect.';
    echo $_SESSION['error'];  // Afficher un message d'erreur
    exit;
}
?>
