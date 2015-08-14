var backtrackingService = function($timeout)
{
    var service = {};
    
    var k=0;
    var AS=0;
    service.st = new Array(81);
    
    service.steps = 0;
    
    init = function()
    {
        service.st[k] = 0;
    }
    
    service.hasSuccesor = function (sudokuDomain)
    {
        var cc = (k%9);
        var ll = Math.floor(k/9);

        if (service.st[k] < 9)
        {   
            do 
            {
                service.st[k] ++;
                if (service.st[k] == 10)
                {
                    return 0;
                }
            }while(service.sudokuDomain[ll][cc].indexOf(service.st[k]) == -1);
            return 1;
        }
        return 0;
    };

    service.isValid = function (checkMatrix)
    {
        var cc = (k%9);
        var ll = Math.floor(k/9);

        if(service.checkMatrix[ll][cc] !== -1)
        {
            if (service.checkMatrix[ll][cc] !== service.st[k])
            {
                return 0;
            }
        }

        if(k>=1)
        {
            for (var i=Math.floor(k/9)*9; i<k; ++i)
            {
                if (service.st[i] === service.st[k])
                    return 0;
            }
        }

        if(k>=9)
        {
            for (var i=0; i<ll; i++)
            {
                if (service.st[(i*9)+cc] === service.st[k])
                    return 0;
            }
        }
        
        if(k>1)
        {
            var smallL = Math.floor(ll/3)*3;
            var smallC = Math.floor(cc/3)*3;
            
            for (var i=smallL; i<smallL+3; i++)
            {
                for (var j=smallC; j<smallC+3; j++)
                {
                    if ((i*9)+j < k)
                    if (service.st[(i*9)+j] === service.st[k])
                    return 0;
                }
            }
        }

        return 1;
    };

    service.isSolution = function()
    {
        if (k === 80)
            return 1;
        return 0;
    };

    service.solutionHandler = function ()
    {
        var c = "";
        for (var i=0; i<=k; ++i)
        {
            if (i%9==0) c += "\n";
            c += service.st[i] + " ";
        }

        console.log(c);
    }
    
    service.checkMatrix = null;
    service.sudokuDomain = null;
    
    service.back = function (_checkMatrix, _sudokuDomain)
    {
        k = 0;
        init ();
        /*while (k > -1)
        {
            
        }*/
        
        service.checkMatrix = _checkMatrix;
        service.sudokuDomain = _sudokuDomain;
        
        $timeout(service.moveK.bind(service), 100);
    }
    
    service.moveK = function()
    {
        do
            {
                service.steps++;
            }
            while ( (AS = service.hasSuccesor(service.sudokuDomain)) && (service.isValid(service.checkMatrix) !== 1) );
            
            if (AS)
                if (service.isSolution())
                {
                    service.solutionHandler();
                    return;
                }
                else
                {
                    k ++;
                    init ();
                }
            else
            {
                service.st[k] = "";
                k --;
            }
                
                
        if(k > -1) $timeout(service.moveK.bind(service), service.speedGetter());
    }
    
    service.speedGetter = function()
    {
        return 100;
    }
    
    service.setAlgSpeedGetter = function(f)
    {
        
        service.speedGetter = f;
    }
    
    service.getSolutionArray = function()
    {
        return service.st;
    }
            
    return service;     
}