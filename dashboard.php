<?php
session_start();

// Vérification de la connexion
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: login.html'); // Rediriger vers la page de login si non connecté
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableau de bord</title>
</head>
<body>
    <h1>Bienvenue sur le tableau de bord</h1>
    <p>Vous êtes connecté en tant que : <?php echo $_SESSION['email']; ?></p>
    <a href="logout.php">Se déconnecter</a>
</body>
</html>
