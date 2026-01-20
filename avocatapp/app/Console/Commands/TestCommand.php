<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\DomCrawler\Crawler;
use GuzzleHttp\Client;

class TestCommand extends Command
{
    protected $signature = 'test:command';

    protected $description = 'This is a test command';

    protected $degrees = [];

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $client = new Client([
            'verify' => false,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0',
                'Sec-Fetch-Site' => 'same-origin',
            ],
        ]);

        $response = $client->request('GET', 'https://moj.gov.eg/ar/Pages/Services/CaseCurrentStatus.aspx');
        $html = (string) $response->getBody();
        $crawler = new Crawler($html);

        $crawler->filterXPath('//select[@id="ctl00_ctl58_g_7dd5062a_d3d6_4e62_aca8_27975ce28424_ddlDegree"]/option')->each(function (Crawler $node) {
            $value = $node->attr('value');
            $label = trim(preg_replace('/\s+/', ' ', $node->text()));
            if (!empty($value)) {
                $this->degrees[] = [
                    'value' => $value,
                    'label' => $label,
                ];
            }
        });

        return 0;
    }

}
