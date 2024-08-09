<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
<body>
    <?php

    class Monkey {
        public $mIndex;
        public $startItems;
        public $operation;
        public $divisByNumTest;
        public $trueMIndex;
        public $falseMIndex;
        public function __construct($mIndex, $startItems, $operation, $divisByNumTest, $trueMIndex, $falseMIndex) {
            $this->$mIndex = $mIndex;
            $this->$startItems = $startItems;
            $this->$operation = $operation;
            $this->$divisByNumTest = $divisByNumTest;
            $this->$trueMIndex = $trueMIndex;
            $this->$falseMIndex = $falseMIndex;
        }
        public function turn() {
            // For each item the monkey does the following
            // 1. Inspects the item and the worry undergoes the operation
            // 2. The inspection doesn't damage the item so the worry level is divided by 3 and rounded down to the nearest int
            // 3. The monkey applies the test and uses the result to determine where to throw the item
            // 4. Goes to the next item (or the next monkey if we reached the final item)
            $startItemsCopy = $startItems;
            foreach ($startItemsCopy as $it) {
                $this->handleItem($it);
            }
            $startItems = [];
            return []; // TODO: The info needed to know where to put all of the monkeys
        }
        public function handleItem($item) {
            // How are we going to parse the operation string? Could probably do it char by char with a switch for the operator part
            $OldWorLev = (int)$item;

            // apply operation 
            $operator = $this->operation[0];
            $numInOp = (int)$this->operation[1];
            $newWorLev = 0;
            switch ($operator) {
                case '+':
                    $newWorLev = $OldWorLev + $numInOp;
                    break;
                case '*':
                    $newWorLev = $OldWorLev + $numInOp;
                    break;
                default:
                    echo "Not working.";
            }

            // Do the divide by 3
            $newWorLev = (int)floor($newWorLev/3);

            // Give to new monkey
            $newMonkey = 0;
            if ($newWorLev % $divisByNumTest == 0) {
                $newMonkey = $trueMIndex;
            } else {
                $newMonkey = $falseMIndex;
            }
            return []; // TODO: The new monkey and the new worry level
        }
        public function toString() 
        {
            $startItemsImplode = implode(", ", $this->$startItems);
            $operationImplode = implode(", ", $this->$operation);
            echo "Id:{$this->$mIndex}\n StartItems:{$startItemsImplode}\n Operation:{$operationImplode}\n";
        }
    }

    $txt_file = file_get_contents('C:\xampp\htdocs\AOC22\Day11\data.txt');
    $rows        = explode("\n", $txt_file);
    $monkeyList = [];
    $currentMonkeyIndex = -1;
    foreach($rows as $row => $data)
    {
        $dataArr = explode(" ", trim($data, " "));

        $currentStartingItems = [];
        $currentOperation = [];
        $currentDivideByTestNum = -1;
        $currentTrueM = -1;
        $currentFalseM = -1;

        if ($dataArr[0] == "Monkey")
        {
            $currentMonkeyIndex = (int)$dataArr[1];
        } 
        else if ($dataArr[0] == "Starting") 
        {
            foreach($dataArr as $col)
            {
                if (preg_match('/^[0-9]+[,]?$/', $col))
                {
                    $currentStartingItems.array_push((int)str_replace(",","",$col));
                }
            }
        }
        else if ($dataArr[0] == "Operation") 
        {
            foreach($dataArr as $col)
            {
                if (preg_match('/^[*-\/+0-9]+$/', $col))
                {
                    $currentOperation.array_push($col);
                }
            }
        }
        else if ($dataArr[0] == "Test")
        {
            $currentDivideByTestNum = (int)end($dataArr);
        }
        else if ($dataArr[1] == "true")
        {
            $currentTrueM = (int)end($dataArr);
        }
        else if ($dataArr[1] == "false")
        {
            $currentFalseM = (int)end($dataArr);
            $monkeyList.array_push(new Monkey($currentMonkeyIndex, $currentStartingItems, $currentOperation, $currentDivideByTestNum, $currentTrueM, $currentFalseM));
        }
        echo "{$data}\n";
    }

/*
// Start with the time in 24 hr format and convert it into the ''reflected' time (e.g. 23:59:43 -> 00:00:17)  
function message($inputNum) 
{
    if ($inputNum < 10) 
    {
        return '0' . strval($inputNum);
    }
    else 
    {
        return strval($inputNum);
    }
}

$tpartArr = explode(":", $time);
$output = message(23 - ((int)$tpartArr[0])) . ':' . message(59 - ((int)$tpartArr[1])) . ':' . message(60 - ((int)$tpartArr[2]));
echo("{$output}\n");

// Old stuff
        echo("Hello World!"); 
        echo "Hello World!V2"; 

        $x = 20;
        $y = "Tiger";

        echo $x;
        echo $y;

        echo "<p>It is International $y day.</p>";

        $z = 4;

        echo $x * $z;

        var_dump($z);

        $t1 = $t2 = $t3 = 5;
        
        $testArr = [1,2,3];

        var_dump($testArr);

        $sQWord = 'Lion';

        echo '<p> Another animal is a ' . $sQWord . '.'; # Apparently when using single quotes we need to use the . operator

        $flTest = 5.2323;
        echo "<p> An example of a float is $flTest. </p>";

        $boTest = true;
        $arrTest = array("dolpin", "narwhal", "southern right whale");

        class Animal {
            public $surfaceTexture;
            public $movementMethod;
            public function __construct($surfaceTexture, $movementMethod) {
                $this->surfaceTexture = $surfaceTexture;
                $this->movementMethod = $movementMethod;
            }
            public function message() {
                return "<p>The animal has a $this->surfaceTexture feel and transports itself around by $this->movementMethod.</p>";
            }
        }

        $tiger = new Animal("furry", "prowling");
        $narwhal = new Animal("slippery", "swimming");
        $adder = new Animal("leathery", "squirming");

        $animals = array($tiger, $narwhal, $adder);

        foreach ($animals as $a) {
            echo $a->message();
        }

        echo strlen("Hello world!");

        echo str_word_count("The quick brown fox jumps over the lazy dog.");*/
    ?>
</body>
</html>
