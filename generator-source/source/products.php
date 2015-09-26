<?php include('template/pageOpen.php'); ?>

        <?php include('template/pageHeader.php'); ?>



        <!-- @: products.php -->
        <?php include('data/products.php'); ?>

        <h1>Products</h1>
        <p>Pricy plastic products at your malls Lego store</p>

        <ul>
            <?php foreach ($products as $product) {
                include('template/product.php');
            } ?>
        </ul>
        <!-- /: products.php -->



        <?php include('template/pageFooter.php'); ?>

<?php include('template/pageClose.php'); ?>