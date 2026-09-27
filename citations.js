// Publication metadata verified against Crossref and the official VLDB paper.
const citations = {
  pfnc: `@article{zhou2025pfnc,
  author  = {Zhou, Qiqi and Shen, Yanyan and Chen, Lei},
  title   = {Faster Convergence in Mini-Batch Graph Neural Networks Training with Pseudo Full Neighborhood Compensation},
  journal = {Proceedings of the VLDB Endowment},
  year    = {2025},
  volume  = {18},
  number  = {11},
  pages   = {4309--4322},
  doi     = {10.14778/3749646.3749695},
  url     = {https://doi.org/10.14778/3749646.3749695}
}`,
  brfe: `@inproceedings{zhou2023inputmismatch,
  author    = {Zhou, Qiqi and Shen, Yanyan and Chen, Lei},
  title     = {Narrow the Input Mismatch in Deep Graph Neural Network Distillation},
  booktitle = {Proceedings of the 29th ACM SIGKDD Conference on Knowledge Discovery and Data Mining},
  series    = {KDD '23},
  year      = {2023},
  pages     = {3581--3592},
  publisher = {Association for Computing Machinery},
  doi       = {10.1145/3580305.3599442},
  url       = {https://doi.org/10.1145/3580305.3599442}
}`
};

document.querySelectorAll('.bibtex-button').forEach(button => {
  let resetTimer;
  button.addEventListener('click', async () => {
    const citation = citations[button.dataset.citation];
    const status = button.parentElement.querySelector('.copy-status');
    const links = button.closest('.paper-links');
    clearTimeout(resetTimer);
    try {
      await navigator.clipboard.writeText(citation);
      button.textContent = 'Copied!';
      status.textContent = 'BibTeX copied.';
      links.querySelector('.citation-fallback')?.remove();
      resetTimer = setTimeout(() => {
        button.textContent = 'Copy BibTeX';
        status.textContent = '';
      }, 2500);
    } catch (_) {
      button.textContent = 'Copy BibTeX';
      status.textContent = 'Select and copy below.';
      let fallback = links.querySelector('.citation-fallback');
      if (!fallback) {
        fallback = document.createElement('textarea');
        fallback.className = 'citation-fallback';
        fallback.readOnly = true;
        fallback.setAttribute('aria-label', `BibTeX citation for ${button.dataset.citation.toUpperCase()}`);
        links.append(fallback);
      }
      fallback.value = citation;
      fallback.focus();
      fallback.select();
    }
  });
});
