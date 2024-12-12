<?php
session_start(); // Démarre la session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Charger le fichier JSON contenant les utilisateurs
    $users = json_decode(file_get_contents('users.json'), true)['users'];

    // Vérifier les identifiants
    foreach ($users as $user) {
        if ($user['email'] === $email && $user['password'] === $password) {
            // Connexion réussie : sauvegarder les infos de session
            $_SESSION['logged_in'] = true;
            $_SESSION['email'] = $email;

            // Redirection vers la page sécurisée
            header('Location: dashboard.php');
            exit;
        }
    }

    // Si les identifiants sont incorrects
    echo "Identifiants incorrects.";
}
?>

