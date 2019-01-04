describe('Tattica testing', async () => {
  const server = 'http://127.0.0.1:8080/test';
  let page;

  before(async () => {
    page = await browser.newPage();
  });

  after(async () => {
    await page.close();
  });

  it('Should load images synchronously', async () => {
    await page.goto(`${server}/loadSync.html`, {
      waitUntil: 'networkidle0',
    });
    const timestamps = await page.evaluate(() => Array
      .from(document.querySelectorAll('[data-flag]'))
      .map(e => Number(e.attributes['data-timestamp-loaded'].value)));
    for (let i = 0; i < timestamps.length - 1; i += 1) {
      expect(timestamps[i]).to.be.below(timestamps[i + 1]);
    }
  });

  it('Should load all images, given correct URLs', async () => {
    await page.goto(`${server}/allImagesAreLoaded.html`, {
      waitUntil: 'networkidle0',
    });
    const completeArray = await page.evaluate(() => Array
      .from(document.querySelectorAll('[data-flag]'))
      .map(e => e.complete));
    const filteredFromTrue = completeArray.filter(e => e === true);
    expect(completeArray).to.be.an('array').that.does.not.include(false);
    expect(filteredFromTrue).to.be.equalTo(completeArray);
  });

  it('Should pass non-empty string to every image if an incorrect URL is provided', async () => {
    await page.goto(`${server}/noBrokenImages.html`, {
      waitUntil: 'networkidle0',
    });
    const src = await page.evaluate(() => Array
      .from(document.querySelectorAll('[data-flag]'))
      .map(e => e.src));
    expect(src).to.be.an('array');
    src.forEach(node => expect(node).to.be.a('string'));
  });

  it('Should start loading images belonging to the same block asynchrosously', async () => {
    await page.goto(`${server}/loadBlock.html`, {
      waitUntil: 'networkidle0',
    });
    const block = await page.evaluate(() => Array
      .from(document.querySelectorAll('[data-block="1"]'))
      .map(e => Math.floor(Number(e.attributes['data-timestamp-start'].value) * 0.01)))
    for (let i = 0; i < block.length - 1; i += 1) {
      expect(block[i]).to.be.equal(block[i + 1]);
    }
  });

  it('Should load synchronously group of images that contain a block', async () => {
    await page.goto(`${server}/loadSyncWithBlocks.html`, {
      waitUntil: 'networkidle0',
    });
    const timestamps = await page.evaluate(() => Array
      .from(document.querySelectorAll('[data-flag]'))
      .map(e => Number(e.attributes['data-timestamp-loaded'].value)));
    for (let i = 0; i < timestamps.length - 1; i += 1) {
      expect(timestamps[i]).to.be.at.most(timestamps[i + 1]);
    }
  });

  it('Should load images with attribute `data-priority` first', async () => {
    await page.goto(`${server}/loadPriorityFirst.html`, {
      waitUntil: 'networkidle0',
    });
    const elements = await page.evaluate(() => {
      const flags = Array.from(document.querySelectorAll('[data-flag]'));
      const withPriority = flags
        .filter(e => e.attributes['data-priority'])
        .map(e => Number(e.attributes['data-timestamp-loaded'].value));
      const others = flags
        .filter(e => !e.attributes['data-priority'])
        .map(e => Number(e.attributes['data-timestamp-loaded'].value));
      return {
        withPriority,
        others,
      };
    });
    elements.withPriority.forEach((e) => {
      expect(e).to.be.below(elements.others[0]);
      expect(e).to.be.below(elements.others[1]);
      expect(e).to.be.below(elements.others[2]);
    });
  });
});
