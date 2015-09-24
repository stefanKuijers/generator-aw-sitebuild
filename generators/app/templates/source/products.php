<?php include('templates/pageOpen.php'); ?>

        <?php include('templates/pageHeader.php'); ?>



        <!-- @: products.php -->
        <?php include('data/products.php'); ?>

        <h1>Products</h1>
        <p>Pricy plastic products at your malls Lego store</p>

        <ul>
            <?php foreach ($products as $product) {
                include('templates/product.php');
            } ?>
        </ul>
        <!-- /: products.php -->



        <?php include('templates/pageFooter.php'); ?>

<?php include('templates/pageClose.php'); ?>