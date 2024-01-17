<?php
header('Content-Type: application/json');
// Utilisez des variables d'environnement ou un fichier de configuration pour les identifiants
require 'config.php'; // Ce fichier doit être sécurisé et non accessible depuis le web

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(array('error' => 'La connexion a échoué : ' . $conn->connect_error)));
}

$query = "SELECT * FROM production_cinématographique"; // Remplacez par le nom réel de votre table
$result = $conn->query($query);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    echo json_encode(array('error' => 'Aucune donnée trouvée'));
}

// Fermer la connexion
$conn->close();
?>
